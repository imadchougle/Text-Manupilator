import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);

  const handleAboutClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
          TextManipulator

          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link about-link"
                  onClick={handleAboutClick}
                  style={{ cursor: 'pointer' }}
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title >About Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="about-content">
            <h2>Welcome to our Text Manipulation and Analysis Tool</h2>
            <p>
              We provide a comprehensive set of features and functionalities to help you work with text more efficiently and effectively.
            </p>
            <h4>Features</h4>
            <ul>
              <li>Text Formatting: Convert text to uppercase or lowercase, capitalize words or sentences, and manipulate formatting.</li>
              <li>Word Count and Statistics: Analyze text for word count, character count, sentence count, average word length, longest word, and more.</li>
              <li>Text Analysis: Identify the most frequent words in your text to gain insights into word usage patterns.</li>
              <li>Reading Time Calculation: Estimate the reading time for your text, ideal for content creators and readers.</li>
              <li>Text Transformation: Easily copy the modified text to the clipboard for use in other applications or documents.</li>
            </ul>
            <h4>Who Can Benefit?</h4>
            <p>
              Our website is designed to assist individuals, professionals, students, and anyone who works with text regularly. Here are a few examples of who can benefit from our tool:
            </p>
            <ul>
              <li>Writers and Authors: Improve your writing process and enhance the quality of your content.</li>
              <li>Bloggers: Optimize your blog posts by analyzing word count, readability, and more.</li>
              <li>Content Creators: Streamline text formatting and analysis for various digital content.</li>
              <li>Students: Easily analyze and manipulate text for assignments, essays, and research papers.</li>
              <li>Professionals: Quickly process and transform text for reports, presentations, and data analysis.</li>
            </ul>
            <p>
              We strive to provide a user-friendly experience and valuable insights for all your text-related tasks. Whether you're a professional writer, a student, or someone who frequently works with text, our Text Manipulation and Analysis Tool is here to support you.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



    </div>
  );
}
