import MainSlider from "@/components/maincontent/main.slider";
import { Container } from "@mui/material";
import { sendRequest } from "../../utils/api";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export default async function HomePage() {

  const session = await getServerSession(authOptions);
  console.log("check session server:", session)
  // get session
  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "CHILL",
      limit: "10"
    }
  });
  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "WORKOUT",
      limit: "10"
    }
  });
  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "PARTY",
      limit: "10"
    }
  });


  return (

    <Container
      style={{
        paddingBottom: '50px',
        // paddingTop: '50px'
      }}>
      <MainSlider
        title={"Top Chill"}
        data={chills?.data ? chills.data : []} />
      <MainSlider
        title={"Top Workout"}
        data={workouts?.data ?? []} />
      <MainSlider
        title={"Top Party"}
        data={party?.data ? party.data : []} />
    </Container>
  );
}
