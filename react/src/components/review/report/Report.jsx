import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { addReport } from "../../../slices/review/reportSlice.js";

const Report = ({ show, handleClose, branch }) => {
  const dispatch = useDispatch();
  const [reportContent, setReportContent] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        addReport({ report: reportContent, branchId: branch.id })
      ).unwrap();
      setAlertMessage("Report sent successfully!");
      setReportContent("");
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
      handleClose();
    } catch (err) {
      setAlertMessage("Failed to send report. Please try again.");
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        onExited={() => setReportContent("")}
        className="report-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="reportContent">
              <Form.Label className="mb-3">Report Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                placeholder="Enter report details..."
                required
                className="mb-3"
              />
            </Form.Group>
            <Button
              variant="danger"
              type="submit"
              disabled={reportContent.trim() === ""}
            >
              Submit Report
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {alertMessage && (
        <Alert
          variant={alertMessage.includes("successfully") ? "success" : "danger"}
          className="position-fixed m-3"
        >
          {alertMessage}
        </Alert>
      )}
    </>
  );
};

export default Report;
