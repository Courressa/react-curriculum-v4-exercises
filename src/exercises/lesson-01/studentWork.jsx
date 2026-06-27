//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  //add variables here
  const name = 'Courressa Malcolm';
  const age = 25;
  const hobbies = [
    'Playing League of Legends',
    'Reading Mangas',
    'Watching Animes',
  ];

  return (
    <div>
      {/* add JSX here */}
      <h1>{name}</h1>
      <p>
        {' '}
        Hello~ My name is {name} and I am {age} years old. I am aiming for a
        career in Software Engineering and I am enjoying my journey so far. A
        few of my hobbies are:{' '}
      </p>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
