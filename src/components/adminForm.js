import React, { useState } from "react";
import AdminFormDefault from "./adminFormDefault";
import AdminFormAlternative from "./adminFormAlternative";
import { useRouter } from "next/router";

function AdminForm(props) {
  const router = useRouter();
  const currentId = isNaN(props.params[1])
    ? props.params[1]
    : Number(props.params[1]);
  
  const tableName = props.params[0];
  const url = router.asPath;


  const [showDefaultPage, setShowDefaultPage] = useState(true);
  return (
    <div>
      {showDefaultPage ? (
        <AdminFormDefault
          currentId={currentId}
          tableName={tableName}
          url={url}
          handleShow={setShowDefaultPage}
        />
      ) : (
        <AdminFormAlternative
          currentId={currentId}
          tableName={tableName}
          url={url}
          handleShow={setShowDefaultPage}
        />
      )}
    </div>
  );
}

export default AdminForm;
