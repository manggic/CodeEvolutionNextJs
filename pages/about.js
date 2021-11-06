import Footer from "../components/layout/Footer";
import styles from "../styles/About.module.scss";
import Head from "next/head";
function About() {
  return (
    <div>
      <Head>
        <title>About Code Evolution</title>
        <meta name="description" content="Free tuts on web Development" />
      </Head>
      <h1 className={styles.highlight}>About</h1>
      <button className="btn btn-secondary">primary</button>
    </div>
  );
}

export default About;

About.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};
