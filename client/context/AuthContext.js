import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../APIConnection/indexAPI";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(null);
  const [changePassword, setChangePassword] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activitysessions, setactivitySessions] = useState([]);
  const [weeklySession, setWeeklySession] = useState([]);

  const [grades, setGrades] = useState([]);
  const [days, setDays] = useState([
    { completed: false, day: "M" },
    { completed: false, day: "Tu" },
    { completed: false, day: "W" },
    { completed: false, day: "Th" },
    { completed: false, day: "F" },
    { completed: false, day: "Sa" },
    { completed: false, day: "Su" },
  ]);
  const [challenges, setChallenges] = useState([]);
  const [streak, setStreak] = useState(10);
  const [events, setEvents] = useState([]);

  const login = async (email, password) => {
    setIsLoading(true);
    axios
      .post("/sign-in", {
        email,
        password,
      })
      .then(async (res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        setUserToken(userInfo.token);

        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        await AsyncStorage.setItem("userToken", userInfo.token);

        await getSubjects();
      })
      .catch((error) => {
        console.log(`Login error ${error}`);
      });
    setIsLoading(false);
  };
  const createAccount = async ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }) => {
    setIsLoading(true);
    console.log({ firstName, lastName, email, password, confirmPassword });
    axios
      .post("/create-user", {
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      })
      .then(async (res) => {
        let userInfo = res.data;
        if (userInfo.success) {
          setUserInfo(userInfo);
          setUserToken(userInfo.token);
          await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          await AsyncStorage.setItem("userToken", userInfo.token);
        }
      })
      .catch((error) => {
        console.log(`Login error ${error}`);
      });
    setIsLoading(false);
  };
  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    await AsyncStorage.removeItem("userInfo");
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("subjects");
    setIsLoading(false);
  };

  const forgotPasswordLink = async (email) => {
    try {
      const res = await axios.post("/forgot-password", {
        email,
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });

      setForgotPassword(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changePasswordLink = async ({ currentPassword, newPassword }) => {
    try {
      const res = await axios.post(
        "/change-password",
        {
          currentPassword,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      setChangePassword(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getSubjects = async () => {
    try {
      const res = await axios.get("/subject", {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });

      setSubjects(res.data);

      await AsyncStorage.setItem("subjects", JSON.stringify(subjects));
    } catch (e) {
      console.log(e);
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");

      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
        await getSubjects();
        await getAllActivity();
        await getWeeklyProgress();
        //await getAllActivitySession();
      }

      setIsLoading(false);
    } catch (error) {
      console.log(`isLogged in error ${error}`);
      setIsLoading(false);
    }
  };
  const createSubject = async ({ name, color }) => {
    try {
      const data = await axios.post(
        "/create-subject",
        {
          name: name,
          color: color,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      setSubjects([...subjects, data.data]);
      await AsyncStorage.setItem("subjects", JSON.stringify(subjects));
    } catch (error) {
      console.log(error);
      console.log(` YouCan not able to create subject`);
    }
  };
  const deleteSubject = async ({ subjectId }) => {
    try {
      const data = await axios.post(
        "/delete-subject",
        { subjectId },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(data.data);

      const newSubjects = subjects.filter((sub) => {
        return sub._id != subjectId;
      });

      setSubjects(newSubjects);

      await AsyncStorage.setItem("subjects", JSON.stringify(subjects));
    } catch (error) {
      console.log(error);
      console.log("You cannot able to delete subject ");
    }
  };
  const createActivity = async ({ name, color, subjectId }) => {
    try {
      const data = await axios.post(
        "/create-activity",
        {
          name: name,
          color: color,
          subjectId: subjectId,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      setActivities([...activities, data.data]);
      await AsyncStorage.setItem("activities", JSON.stringify(activities));
    } catch (error) {
      console.log(error);
      console.log(` You Can not able to create activities`);
    }
  };

  const getAllActivity = async ({ subjectId }) => {
    console.log(subjectId);
    try {
      const res = await axios.get(`/activity-all/${subjectId}`, {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });

      setActivities(res.data);

      await AsyncStorage.setItem("activities", JSON.stringify(activities));
    } catch (e) {
      console.log(e);
    }
  };

  const deleteActivity = async ({ subjectId, activityId }) => {
    try {
      const res = await axios.post(
        "/delete-activity",
        {
          subjectId: subjectId,
          activityId: activityId,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(res.data);

      const newActivites = activities.filter((act) => {
        return act._id != res.data._id;
      });

      setActivities(newActivites);

      activities.find();
    } catch (error) {
      console.log(error);
    }
  };

  const createEvent = async ({
    eventName,
    eventType,
    eventNote,
    eventDate,
  }) => {


    try {
      console.log("creating event");
      console.log(eventName);
      console.log(eventNote);
      console.log(eventDate);
      const data = await axios.post(
        "/createEvent",
        {
          eventName: eventName,
          eventNote: eventNote,
          eventDate: eventDate,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      setEvents([...events, data.data]);
      await AsyncStorage.setItem("events", JSON.stringify(events));
    } catch (error) {
      console.log(error);
      console.log("was not able to create event");
    }
  };
  const deleteEvent = async ({ event }) => {
    try {
      console.log("deleting event");
      const res = axios.post(
        "/deleteEvent",
        {
          event: event,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      ).then(response => setEvents(response.data))
        ;
    } catch (error) {
      console.log(error);
    }
  };
  const retrieveEvents = async () => {
    try {
      console.log("getting events");
      const data = await axios.get(
        "/getEvents",

        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      setEvents(data.data);
      await AsyncStorage.setItem("events", JSON.stringify(events));
    } catch (error) {
      console.log(error);
    }
  };

  const createGrade = async ({
    gradeName,
    gradeType,
    gradePoints,
    subjectId,
  }) => {
    console.log(gradeName);
    console.log(gradeType);
    console.log(gradePoints);
    console.log(subjectId);
    try {
      const data = await axios.post(
        "/create-grade",
        {
          gradeName: gradeName,
          gradeType: gradeType,
          gradePoints: gradePoints,
          subjectId: subjectId,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      const oldGrade = grades;
      console.log(data.data);
      oldGrade.push(data.data);

      // setGrades([...grades, data.data])
      await AsyncStorage.setItem("grades", JSON.stringify(grades));
    } catch (error) {
      console.log(error);
      console.log("was not able to create grade");
    }
  };
  const getAllGrades = async ({ subjectId }) => {
    try {
      const res = await axios.post(
        "/getAllGrades",
        {
          subjectId: subjectId,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      setGrades(res.data);
      await AsyncStorage.setItem("grades", JSON.stringify(grades));
    } catch (e) {
      console.log(e);
    }
  };
  const deleteGrade = async ({ subject, grade }) => {
    try {
      const res = axios
        .post(
          "/deleteGrade",
          {
            subjectId: subject,
            grade: grade,
          },
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        ).then(response => setGrades(response.data));


      await AsyncStorage.setItem("grades", JSON.stringify(grades));
    } catch (error) {
      console.log(error);
    }
  };

  const addActivitySession = async ({ note, time, activityId }) => {
    try {
      const data = await axios.post(
        "/create-activitySession",
        {
          note: note,
          time: time,
          activityId: activityId,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (activities.activities != undefined || activities.activities != null) {
        // Retrieve updated activity session data from response
        const newActivitySessionData = data.data;
        // Update activity sessions state with new activity session data
        setactivitySessions((prevState) => ({
          ...prevState,
          activities: [...prevState.activities, newActivitySessionData],
        }));

        // Update total time of activity sessions state
        setactivitySessions((prevState) => ({
          ...prevState,
          totalTime: prevState.totalTime + newActivitySessionData.time,
        }));
      }

      await getAllActivitySession({ activityId });

      // if (activities.activities != undefined || activities.activities != null) {
      //   const d = data.data;
      //   const newActives = activitysessions.activites;
      //   newActives.push(d);
      //   const newTotalTime = activitysessions.totalTime + d.time;

      //   newActives.totalTime = newTotalTime;

      //   setactivitySessions(newActives);
      // }
    } catch (error) {
      console.log(error);
      console.log("was not able to add activity session");
    }
  };

  const getAllActivitySession = async ({ activityId }) => {
    try {
      const data = await axios.get(`/getAllActivitySession/${activityId}`, {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });
      // Retrieve updated activity session data from response
      const newActivitySessionData = data.data;
      // Update activity sessions state with new activity session data
      setactivitySessions(newActivitySessionData);
      // await getAllActivitySession({ activityId });
    } catch (error) {
      console.log(error);
    }
  };

  // const getStreak = async () => {
  //   try {
  //     console.log("getting streaks");
  //     const data = await axios.get("/getStreak", {
  //       headers: {
  //         authorization: `Bearer ${userToken}`,
  //       },
  //     });
  //     // setStreak(data.streak);
  //   } catch (error) {
  //     console.log("get streak error");
  //   }
  // };
  // const getDays = async () => {
  //   try {
  //     console.log("getting days");

  //     const data = await axios.get("/getDays", {
  //       headers: {
  //         authorization: `Bearer ${userToken}`,
  //       },
  //     });
  //     //setDays(data.days);
  //   } catch (error) {
  //     console.log("get days error");
  //   }
  // };

  const getChallenges = async () => {
    try {
      const res = await axios.post(
        "/getChallenges",
        {
          userId: userInfo,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      setChallenges(res.data);
    } catch (error) {
      console.log("get challenges error");
    }
  };
  const updateChallenges = async ({ activityType, activityTime }) => {
    try {
      console.log("updating challenges");
      console.log(activityType);
      console.log(activityTime);
      const data = await axios.post(
        "/updateChallenges",
        {
          activity: activityType,
          time: activityTime,
          userId: userInfo,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
    } catch (error) {
      console.log("upatechallenge error ", error);
    }
  };

  const getWeeklyProgress = async () => {
    try {
      const { data } = await axios.get("/getWeeklyProgress", {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });
      setWeeklySession(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await isLoggedIn();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        createAccount,
        login,
        logout,
        userToken,
        isLoading,
        userInfo,
        createSubject,
        getSubjects,
        subjects,
        setSubjects,
        createActivity,
        activities,
        getAllActivity,
        deleteActivity,
        createGrade,
        getAllGrades,
        deleteSubject,
        deleteGrade,
        grades,
        addActivitySession,
        getAllActivitySession,
        activitysessions,
        days,
        challenges,
        streak,
        // getDays,
        // getStreak,
        getChallenges,
        updateChallenges,
        forgotPasswordLink,
        forgotPassword,
        createEvent,
        deleteEvent,
        retrieveEvents,
        events,
        changePasswordLink,
        changePassword,
        weeklySession,
        getWeeklyProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
