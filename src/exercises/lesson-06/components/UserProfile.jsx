export default function UserProfile({ name }) {
  return (
    <div>
      <h2>Welcome, {name ? name : 'Student'}</h2>
    </div>
  );
}
