import Head from "next/head";
import About from "../components/About";
import BlogSection from "../components/BlogSection";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ProjectSection from "../components/ProjectSection";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect } from "react";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Abir Santra | Web Developer | Graphics Designer</title>
        <meta
          name="description"
          content="Abir Santra's portfolio website. You can find all about Abir Santra on this site."
        />
        <link rel="icon" href="/abir dp small.png" />
      </Head>

      <Hero />
      <About />
      <ProjectSection />
      <BlogSection posts={posts} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = new ApolloClient({
    uri: "https://api.hashnode.com/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetPosts {
        user(username: "AbirSantra") {
          publication {
            posts(page: 0) {
              _id
              slug
              title
              brief
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      posts: data.user.publication.posts,
    },
  };
}
