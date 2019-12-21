import React from 'react';
import Button from "react-bootstrap/Button";
import styled from "@emotion/styled";

function ActionButton({children, ...rest}) {
    return (
        <Button size="sm" {...rest}>
            {children}
        </Button>
    );
}

export default styled(ActionButton)`
  border-radius: 50%;
  width: 35px;
  height: 35px;
`;