export default function Home() {
  return <div></div>;
}

export function getStaticProps(context) {
  return {
    redirect: {
      destination: "/c/business",
    },
  };
}
