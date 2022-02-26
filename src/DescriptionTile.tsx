import { InlineStylesModel } from "./models/InlineStyleModel";

const styles: InlineStylesModel = {
  descriptionHeader: {
    fontSize: "25px",
    fontWeight: 500,
    padding: "0px 0px",
    margin: "0px",
  },
  tileWrapperContainer: {
    padding: "15px",
    borderBottom: "1px solid rgba(91,97,110, .2)",
  },
};

export const DescriptionTile = () => {
  return (
    <>
      <div style={styles.tileWrapperContainer}>
        <h2 style={styles.descriptionHeader}>Description</h2>
      </div>
      <div style={styles.tileWrapperContainer}>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </>
  );
};
