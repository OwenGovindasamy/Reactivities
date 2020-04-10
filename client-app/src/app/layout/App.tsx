import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Agent from "../API/Agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, SetLoading] = useState(true);
  const [submitting, SetSubmitting] = useState(false);
  const [target, setTaget] = useState('');
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };
  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    SetSubmitting(true);
    Agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => SetSubmitting(false));
  };
  const handleEditActivity = (activity: IActivity) => {
    SetSubmitting(true);
    Agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]); //this will create an array with all the activities that do not match id that we passing in
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => SetSubmitting(false));
  };
  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>,id: string) => {
    SetSubmitting(true);
    setTaget(event.currentTarget.name);
    Agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter((a) => a.id !== id)]);
      })
      .then(() => SetSubmitting(false));
  };
  useEffect(() => {
    Agent.Activities.list()
      .then((response) => {
        let activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        }); //formats date

        setActivities(activities);
      })
      .then(() => SetLoading(false)); //close loader
  }, []); // , [] without this axios.get looped

  if (loading) {
    return <LoadingComponent content="Loading Activities..." />;
  }

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
