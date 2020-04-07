import React from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  editMode: Boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  editMode,
  setEditMode,
  setSelectedActivity,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width={6}>
        {/* on the right of && is displayed only if its not null and not in edit mode */}
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {/* only display if in edit mode */}
        {editMode && (
          <ActivityForm 
          setEditMode={setEditMode}
          activity={selectedActivity!} 
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
export default ActivityDashboard;
