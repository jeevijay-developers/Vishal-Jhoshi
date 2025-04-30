import React, { useState } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";

const QuestionForm = () => {
  const [questionData, setQuestionData] = useState({
    subjectName: "",
    chapterName: "",
    topicName: "",
    descriptionText: "",
    options: [
      { optionText: "", descImage: null },
      { optionText: "", descImage: null },
      { optionText: "", descImage: null },
      { optionText: "", descImage: null },
    ],
    correctAnswers: [] as number[],
    difficulty: "easy",
    showModal: false,
    descriptionImage: null as File | null,
    optionImages: [null, null, null, null] as (File | null)[],
  });

  const handleOptionChange = (
    index: number,
    field: string,
    value: string | File | null
  ) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    setQuestionData({ ...questionData, options: updatedOptions });
  };

  const handleCorrectAnswerChange = (index: number) => {
    const updatedCorrectAnswers = [...questionData.correctAnswers];
    if (updatedCorrectAnswers.includes(index)) {
      updatedCorrectAnswers.splice(updatedCorrectAnswers.indexOf(index), 1);
    } else {
      updatedCorrectAnswers.push(index);
    }
    setQuestionData({ ...questionData, correctAnswers: updatedCorrectAnswers });
  };

  const handleImageModalClose = () =>
    setQuestionData({ ...questionData, showModal: false });

  const handleImageModalShow = () =>
    setQuestionData({ ...questionData, showModal: true });

  const handleImageUpload = (field: string, file: File | null) => {
    if (field === "descriptionImage") {
      setQuestionData({ ...questionData, descriptionImage: file });
    }
  };

  const handleOptionImageUpload = (index: number, file: File | null) => {
    const updatedOptionImages = [...questionData.optionImages];
    updatedOptionImages[index] = file;

    const updatedOptions = [...questionData.options];
    updatedOptions[index].descImage = file;

    setQuestionData({
      ...questionData,
      optionImages: updatedOptionImages,
      options: updatedOptions,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // You can replace this with API logic
    console.log("Submitting question data:");
    console.log(questionData);

    alert("Form submitted successfully!");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>Subject</Form.Label>
            <Form.Control
              as="select"
              value={questionData.subjectName}
              onChange={(e) =>
                setQuestionData({
                  ...questionData,
                  subjectName: e.target.value,
                })
              }
            >
              <option value="">Select Subject</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="english">English</option>
            </Form.Control>
          </Col>
          <Col md={4}>
            <Form.Label>Chapter</Form.Label>
            <Form.Control
              as="select"
              value={questionData.chapterName}
              onChange={(e) =>
                setQuestionData({
                  ...questionData,
                  chapterName: e.target.value,
                })
              }
            >
              <option value="">Select Chapter</option>
              <option value="chapter1">Chapter 1</option>
              <option value="chapter2">Chapter 2</option>
            </Form.Control>
          </Col>
          <Col md={4}>
            <Form.Label>Topic</Form.Label>
            <Form.Control
              as="select"
              value={questionData.topicName}
              onChange={(e) =>
                setQuestionData({ ...questionData, topicName: e.target.value })
              }
            >
              <option value="">Select Topic</option>
              <option value="topic1">Topic 1</option>
              <option value="topic2">Topic 2</option>
            </Form.Control>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Description Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={questionData.descriptionText}
              onChange={(e) =>
                setQuestionData({
                  ...questionData,
                  descriptionText: e.target.value,
                })
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Button variant="primary" onClick={handleImageModalShow}>
              Add Image
            </Button>
          </Col>
        </Row>

        {questionData.options.map((option, index) => (
          <Row className="mb-3" key={index}>
            <Col md={10}>
              <Form.Label>Option {index + 1}</Form.Label>
              <Form.Control
                type="text"
                value={option.optionText}
                onChange={(e) =>
                  handleOptionChange(index, "optionText", e.target.value)
                }
              />
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                label="Correct"
                checked={questionData.correctAnswers.includes(index)}
                onChange={() => handleCorrectAnswerChange(index)}
              />
            </Col>
          </Row>
        ))}

        <Row className="mb-3">
          <Col>
            <Form.Label>Difficulty</Form.Label>
            <Form.Control
              as="select"
              value={questionData.difficulty}
              onChange={(e) =>
                setQuestionData({ ...questionData, difficulty: e.target.value })
              }
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Form.Control>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit Question
        </Button>
      </Form>

      {/* Modal for Images */}
      <Modal show={questionData.showModal} onHide={handleImageModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col>
              <Form.Label>Description Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload(
                    "descriptionImage",
                    (e.target as HTMLInputElement).files?.[0] || null
                  )
                }
              />

              {questionData.descriptionImage && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(questionData.descriptionImage)}
                    alt="Description"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </Col>
          </Row>

          {questionData.options.map((_, index) => (
            <Row className="mb-3" key={index}>
              <Col>
                <Form.Label>Option {index + 1} Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleOptionImageUpload(
                      index,
                      (e.target as HTMLInputElement).files?.[0] || null
                    )
                  }
                />

                {questionData.optionImages[index] && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(
                        questionData.optionImages[index]!
                      )}
                      alt={`Option ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </Col>
            </Row>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleImageModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleImageModalClose}>
            Save Images
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QuestionForm;
