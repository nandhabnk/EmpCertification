import styled from "styled-components";

export const RequestDetailsWrapper = styled.div`
  .MuiBox-root {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 900px;
    min-height: 500px;
    background-color: #fff;
    border-radius: 10px;
    max-height: 90vh;
    overflow: auto;
  }
  #request-details-heading {
    background-color: #1976d2;
    color: #fff;
    border-radius: 9px 9px 0px 0px;
  }
  iframe {
    width: 300px;
    height: 460px;
  }
  .MuiModalClose-root {
    transform: translate(0px, -13px);
    color: red;
    background: white;
  }
  #no-certificate-card {
    padding: 20px 10px;
  }
`;
