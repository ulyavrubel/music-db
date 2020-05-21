import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { firebaseDB } from "../Auth/FirebaseInit";
import { Link } from "@reach/router";

function ActivityLog() {
  const { currentUser } = useContext(AuthContext);
  const [activity, setActivity] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [activityWithAlbums, setActivityWithAlbums] = useState([]);

  useEffect(() => {
    let d = new Date();
    d.setMonth(d.getMonth() - 1);

    if (currentUser) {
      setActivity([]);
      firebaseDB
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Activity")
        .orderBy("date", "desc")
        .where("date", ">=", d)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let log = doc.data();
            log.logID = doc.id;
            setActivity((prev) => {
              return [...prev, log];
            });
          });
          setLoaded(true);
        })
        .catch((err) => {
          if (err) {
            console.log("Error getting documents", err.message);
            setActivity([]);
          }
        });
    }
  }, [currentUser]);

  useEffect(() => {
    setActivityWithAlbums([]);
    if (loaded) {
      activity.forEach((log) => {
        firebaseDB
          .collection("Albums")
          .doc(log.album)
          .get()
          .then((doc) => {
            let result = doc.data();
            result.id = doc.id;
            result.log = log.log;
            result.logID = log.logID;
            result.addedDate = log.date.toDate();
            setActivityWithAlbums((prev) => {
              return [...prev, result];
            });
          })
          .catch((err) => {
            if (err) {
              console.log(log, "Error getting documents", err.message, err);
              setActivityWithAlbums([]);
            }
          });
      });
    }
  }, [activity, loaded]);

  const activityLogs = activityWithAlbums.map((log) => {
    let addedDate = new Date(log.addedDate);
    let formatedDate = addedDate.toDateString().split(" ").slice(1).join(" ");
    return (
      <div className="activity-item marg-t-xxs" key={log.logID}>
        <Link to={`/albums/${log.id}`}>
          <img
            className="activity-item__img"
            src={log.url}
            alt={`${log.artist} - ${log.title}`}
          ></img>
        </Link>
        <div>
          <p className="activity-item__info">
            {log.title} by {log.artist} {log.log}
          </p>
          <p className="activity-item__date">{formatedDate}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="activity">
      <p className="activity__header">Recent activity</p>
      <div>{activityLogs}</div>
    </div>
  );
}
export default ActivityLog;
