type Node = { id: string; x: number; y: number; wave: number };
type Edge = { from: string; to: string; wave: number };

const NETWORK_SEED = 68491;
const NODES_PER_COMMUNITY = 12;

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function shuffle<T>(items: T[], random: () => number) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

const network = (() => {
  const random = seededRandom(NETWORK_SEED);
  const centres = [112, 340, 568];
  const nodes: Node[] = [];
  const communities: string[][] = [];

  centres.forEach((centre, communityIndex) => {
    const community: string[] = [];
    for (let index = 0; index < NODES_PER_COMMUNITY; index += 1) {
      const angle = ((Math.PI * 2 * index) / NODES_PER_COMMUNITY) + (random() - .5) * .55;
      const radius = 38 + random() * 49;
      const id = `${communityIndex}-${index}`;
      nodes.push({ id, x: Math.round(centre + Math.cos(angle) * radius), y: Math.round(145 + Math.sin(angle) * radius * .9), wave: 0 });
      community.push(id);
    }
    communities.push(community);
  });

  const drafts: Array<Omit<Edge, 'wave'>> = [];
  const edgeIds = new Set<string>();
  const edgeId = (from: string, to: string) => [from, to].sort().join(':');
  const addEdge = (from: string, to: string) => {
    const id = edgeId(from, to);
    if (from !== to && !edgeIds.has(id)) {
      edgeIds.add(id);
      drafts.push({ from, to });
    }
  };

  communities.forEach((community) => {
    // A random spanning tree keeps every local group reachable.
    for (let index = 1; index < community.length; index += 1) addEdge(community[index], community[Math.floor(random() * index)]);

    const candidates: Array<[string, string]> = [];
    for (let from = 0; from < community.length; from += 1) {
      for (let to = from + 1; to < community.length; to += 1) {
        if (!edgeIds.has(edgeId(community[from], community[to]))) candidates.push([community[from], community[to]]);
      }
    }
    // √Y random extra ties, where Y is the remaining possible local connections.
    shuffle(candidates, random).slice(0, Math.ceil(Math.sqrt(candidates.length))).forEach(([from, to]) => addEdge(from, to));
  });

  // A few random bridges join otherwise distinct communities.
  [[communities[0], communities[1]], [communities[1], communities[2]]].forEach(([left, right]) => {
    for (let bridge = 0; bridge < 2; bridge += 1) addEdge(left[Math.floor(random() * left.length)], right[Math.floor(random() * right.length)]);
  });

  const sourceId = nodes[Math.floor(random() * nodes.length)].id;
  const neighbours = new Map(nodes.map((node) => [node.id, [] as string[]]));
  drafts.forEach(({ from, to }) => {
    neighbours.get(from)?.push(to);
    neighbours.get(to)?.push(from);
  });

  const distances = new Map([[sourceId, 0]]);
  const queue = [sourceId];
  for (let index = 0; index < queue.length; index += 1) {
    const current = queue[index];
    const distance = distances.get(current) ?? 0;
    neighbours.get(current)?.forEach((neighbour) => {
      if (!distances.has(neighbour)) {
        distances.set(neighbour, distance + 1);
        queue.push(neighbour);
      }
    });
  }

  nodes.forEach((node) => { node.wave = distances.get(node.id) ?? 0; });
  return {
    nodes,
    sourceId,
    edges: drafts.map(({ from, to }) => ({ from, to, wave: Math.max(distances.get(from) ?? 0, distances.get(to) ?? 0) })),
  };
})();

const positions = Object.fromEntries(network.nodes.map((node) => [node.id, node]));

export function HeroNetwork() {
  return (
    <figure className="hero-network">
      <svg aria-hidden="true" viewBox="0 0 680 290">
        {network.edges.map((edge) => {
          const from = positions[edge.from];
          const to = positions[edge.to];
          return <line className="hero-network__edge" key={`${edge.from}-${edge.to}`} style={{ animationDelay: `${edge.wave * 0.34}s` }} x1={from.x} x2={to.x} y1={from.y} y2={to.y} />;
        })}
        {network.nodes.map((node) => <circle className="hero-network__node" cx={node.x} cy={node.y} key={node.id} r={node.id === network.sourceId ? 8 : 5.5} style={{ animationDelay: `${node.wave * 0.24}s` }} />)}
      </svg>
      <figcaption><span>One node starts the cascade.</span><span>It travels through ties and across groups.</span></figcaption>
    </figure>
  );
}
