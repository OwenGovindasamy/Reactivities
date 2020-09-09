import React, { useContext, useState } from "react";
import { Tab, Header, Card, Image, Button, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../app/Stores/rootStore";
import PhotoUploadWidget from "../../app/common/photoUpload/PhotoUploadWidget";
import { observer } from "mobx-react-lite";

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
    uploadPhoto,
    uploadingPhoto,
    setMainPhoto,
    loading,
    deletePhoto,
  } = rootStore.profileStore;
  const [addPhotoMode, setPhotoMode] = useState(false);
  const handleUploadImage = (photo: Blob) => {
    uploadPhoto(photo).then(() => setPhotoMode(false));
  };

  const [target, setTarget] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | undefined>(
    undefined
  );
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Grid.Column width={16}>
            <Header floated="left" icon="image" content="Photos" />
          </Grid.Column>
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
      </Grid>

      {addPhotoMode ? (
        <PhotoUploadWidget
          uploadPhoto={handleUploadImage}
          loading={uploadingPhoto}
        />
      ) : (
        <Card.Group itemsPerRow={5}>
          {profile &&
            profile.photos.map((photo) => (
              <Card key={photo.id}>
                <Image src={photo.url} />
                {isCurrentUser && (
                  <Button.Group fluid widths={2}>
                    <Button
                      name={photo.id}
                      basic
                      positive
                      content="main"
                      disabled={photo.isMain}
                      onClick={(e) => {
                        setMainPhoto(photo);
                        setTarget(e.currentTarget.name);
                      }}
                      loading={loading && target === photo.id}
                    ></Button>
                    <Button
                      disabled={photo.isMain}
                      name={photo.id}
                      basic
                      negative
                      onClick={(e) => {
                        deletePhoto(photo);
                        setDeleteTarget(e.currentTarget.name);
                      }}
                      icon="trash"
                      loading={loading && target === photo.id}
                    ></Button>
                  </Button.Group>
                )}
              </Card>
            ))}
        </Card.Group>
      )}
    </Tab.Pane>
  );
};
export default observer(ProfilePhotos);
