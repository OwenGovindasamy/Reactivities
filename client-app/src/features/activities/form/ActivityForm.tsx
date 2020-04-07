import React, { useState, ChangeEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //console.log(event.target.value)
    //this method updates the virtual DOM which updated the actual dom to allow editing a field
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form>
        <Form.Input
          onChange={handleInputChange}
          name="Title"
          placeholder="Title"
          value={activity.title}
        />
        {/* <Form.TextArea
          onChange={handleInputChange}
          name="Description"
          rows={2}
          placeholder="Description"
          value={activity.description}
        /> */}
        <Form.Input
          onChange={handleInputChange}
          name="Category"
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="date"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input placeholder="City" value={activity.city} />
        <Form.Input
          onChange={handleInputChange}
          name="Venue"
          placeholder="Venue"
          value={activity.venue}
        />

        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="submit"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
export default ActivityForm;
