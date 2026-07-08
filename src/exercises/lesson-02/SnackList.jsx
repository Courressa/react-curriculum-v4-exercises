export default function SnackList() {
  const snacks = [
    { name: 'Big Foot', rank: 3 },
    { name: 'CheeseZees', rank: 2 },
    { name: 'Ti-gaz', rank: 1 },
  ];

  const orderedSnacks = snacks.toSorted((a, b) => a.rank - b.rank);

  return (
    <ol>
      {orderedSnacks.map((snack) => {
        return <li key={snack.rank}>{snack.name}</li>;
      })}
    </ol>
  );
}
