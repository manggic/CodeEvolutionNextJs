import User from "../components/user";

function UserList({ users }) {
  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.name}>
            <User user={user} />
          </div>
        );
      })}
    </div>
  );
}

export default UserList;

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  const data = await res.json();

  console.log(data);
  return {
    props: {
      users: data,
    },
  };
}
