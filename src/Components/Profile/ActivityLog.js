import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { firebaseDB } from "../Auth/FirebaseInit";

function ActivityLog() {
  const { currentUser } = useContext(AuthContext);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    let d = new Date();
    d.setMonth(d.getMonth() - 2);

    if (currentUser) {
      setActivity([]);
      firebaseDB
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Activity")
        .where("date", ">=", d)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let log = doc.data();

            setActivity((prev) => {
              return [...prev, log];
            });
          });
        })
        .catch((err) => {
          if (err) {
            console.log("Error getting documents", err.message);
            setActivity([]);
          }
        });
    }
  }, [currentUser]);

  //   useEffect(() => {
  //     if (activity.length > 0) {
  //         activity.forEach(log =>{
  //             firebaseDB.collection("Albums").doc(log.id)
  //         })

  //     }
  //   }, [activity]);

  return <div>Recent activity</div>;
}
export default ActivityLog;
