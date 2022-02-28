import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

interface RouteProps {
  component: any;
}

const ValidatedRoute: React.FC<RouteProps> = React.memo(
  ({ component: Component, ...rest }): JSX.Element => {
    const [isActive, setIsActive] = useState<boolean>();



    return (
      <React.Fragment>

      </React.Fragment>
    );
  },
);

export default ValidatedRoute;
