import React, { useEffect, useState } from 'react';
import Loader from 'tt-frontend-framework/Loader/Loader';
import Notification from 'tt-frontend-framework/Notification/Notification';
import { positivlyActions, positivlyState } from 'tt-frontend-hooks/Positivly';

const Base: React.FC = React.memo(
  ({}): JSX.Element => {
    const showLoader = positivlyState((state: any) => state.positivly.showLoader);
    const loaderMessage = positivlyState((state: any) => state.positivly.loaderMessage);
    const showNotification = positivlyState((state: any) => state.positivly.showNotification);
    const notificationMessage = positivlyState((state: any) => state.positivly.notificationMessage);
    const notificationType = positivlyState((state: any) => state.positivly.notificationType);
    const closeNotification = positivlyActions((actions: any) => actions.positivly.closeNotification);

    return (
      <React.Fragment>
        {showLoader && loaderMessage && <Loader show={showLoader} message={loaderMessage} />}
        {showNotification && notificationMessage && notificationType && (
          <Notification
            show={showNotification}
            type={notificationType}
            message={notificationMessage}
            closeNotification={() => closeNotification()}
            autoHide={true}
          />
        )}
      </React.Fragment>
    );
  },
);

export default Base;
