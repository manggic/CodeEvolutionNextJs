import useSWR from "swr";

const fetcher = async () => {
  const response = await fetch("http://localhost:4000/dashboard");

  const data = await response.json();
  return data;
};

function DashboardSWR() {
  const { data, error } = useSWR("dashboard", fetcher);

  if (error) {
    return <h2>An error has occured</h2>;
  }

  if (!data) {
    return "loading....";
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <h2>Post - {data?.posts}</h2>
      <h2>Likes -{data?.likes}</h2>
      <h2>Followers - {data?.followers}</h2>
      <h2>Followings - {data?.following}</h2>
    </div>
  );
}

export default DashboardSWR;
