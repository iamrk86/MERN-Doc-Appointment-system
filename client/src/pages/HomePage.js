import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "../components/Layout";

const HomePage = () => {
  const { loading } = useSelector((state) => state.alerts);
  console.log(loading);
  const getData = async () => {
    try {
      await axios.post(
        "/users/getUserById",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return <Layout>HomePage</Layout>;
};

export default HomePage;
