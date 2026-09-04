const stages = ['1', '2', '4', '8'];

export function ViralGrowth() {
  return (
    <figure className="viral-growth">
      <img alt="A virus multiplying from one particle to two, four, and eight." src="/virus-exponential.png" />
      <ol aria-label="Exponential growth sequence">
        {stages.map((stage) => <li key={stage}>{stage}</li>)}
      </ol>
      <figcaption>One share can become two, four, then eight.</figcaption>
    </figure>
  );
}
