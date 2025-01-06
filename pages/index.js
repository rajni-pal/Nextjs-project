
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from 'next/head';
function HomePage(props) {
  return <>
  <Head>
    <title>React Meetups</title>
    <meta name='description'
    content='Browse a a huge list of highly active React meetups'
    />
  </Head>
  <MeetupList meetups={props.meetups} />;
  </>
}

// export async function getServerSideProps(context){//only runs on server.
//     const req = context.req;
//     const res = context.res;
//     return{
//         props:{
//             meetups:DUMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
  //exectued during build process never reach the machine of client.
  //   fetch("/api/meetups"); // not recomended.
  const client =  await MongoClient.connect('mongodb+srv://rajni:11112222@cluster0.bfz0a.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map(meetup=>({
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        id:meetup._id.toString()
      })),
    },
    revalidate: 10, // incremental static genration
  };
}

export default HomePage;
