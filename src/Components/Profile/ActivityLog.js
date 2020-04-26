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
    d.setMonth(d.getMonth() - 2);

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
            result.addedDate = log.date.toDate();
            setActivityWithAlbums((prev) => {
              return [...prev, result];
            });
          })
          .catch((err) => {
            if (err) {
              console.log("Error getting documents", err.message);
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
      <div className="activity-item" key={log.id}>
        <Link to={`/albums/${log.id}`}>
          <img
            className="activity-img"
            src={log.url}
            alt={`${log.artist} - ${log.title}`}
          ></img>
        </Link>
        <div className="activity-text">
          <p className="activity-info">
            {log.title} by {log.artist} {log.log}
          </p>
          <p className="activity-date">{formatedDate}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="activity-container">
      <p className="activity-header">Recent activity</p>
      <div className="activity-logs">{activityLogs}</div>
    </div>
  );
}
export default ActivityLog;
