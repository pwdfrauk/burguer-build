import Auxiliary from "./auxiliary";
import Modal from "../components/Ui/Modal/Modal";
import { useEffect, useState } from "react";

const withErrorHandler = (WrapenComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    useEffect(() => {
       const reqInterceptors = axios.interceptors.request.use(
        (req) => {
          setError(null);
          return req;
        },
        (err) => err
      );
     const resInterceptors = axios.interceptors.response.use(
        (res) => {
          return res;
        },
        (err) => {
          setError(err);
        }
      );

      return () => {
          console.log(reqInterceptors, resInterceptors)
        axios.interceptors.request.eject(reqInterceptors);
        axios.interceptors.response.eject(resInterceptors);
      }
    }, []);

    const errorConformHandler = () => {
      setError(null);
    };

    return (
      <Auxiliary>
        <Modal show={error} modalclose={errorConformHandler}>
          {" "}
          {error ? error.message : null}
        </Modal>
        <WrapenComponent {...props} />
      </Auxiliary>
    );
  };
};
export default withErrorHandler;
