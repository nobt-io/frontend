import React from "react";
import { FullScreenOverlay } from "components/Overlay";
import MDSpinner from "react-md-spinner";

export const LoadingOverlay = (props) => (
  <div>
    {props.isLoading && (
      <FullScreenOverlay onClose={ () => true }>
        <MDSpinner />
      </FullScreenOverlay>
    ) }

    {!props.isLoading && props.children}
  </div>
);

export default LoadingOverlay

LoadingOverlay.propTypes = {
  isLoading: React.PropTypes.bool.isRequired
}
