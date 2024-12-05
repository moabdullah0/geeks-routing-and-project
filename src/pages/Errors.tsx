import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const Errors = () => {
  const errors = useRouteError();
  console.log(errors);

  return (
    <div className="flex flex-col">
      <h1> OOps ...</h1>
      {isRouteErrorResponse(errors) ? "Invalid Page" : "unexpected error"}
    </div>
  );    
};

export default Errors;
