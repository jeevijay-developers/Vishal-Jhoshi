import React from "react";

type Props = {
  setShowInstruction: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExamInstructions: React.FC<Props> = ({ setShowInstruction }) => {
  return (
    <div className="container py-5 d-flex justify-content-center">
      <article className="w-100 w-md-75 w-lg-60 p-4 p-md-5 bg-light rounded shadow-sm text-center">
        <h1 className="text-primary fw-bold mb-3 display-5">
          📝 Mock Test Instructions
        </h1>
        <p className="text-muted mb-4">
          (For JEE Mains / JEE Advanced / NEET Aspirants)
        </p>

        <InstructionSection title="📌 General Guidelines">
          <li>Read all instructions carefully before starting the test.</li>
          <li>Ensure a stable internet connection throughout the test.</li>
          <li>
            The test is time-bound; the timer starts once you click "Start
            Test".
          </li>
          <li>
            Do not refresh or close the tab — this may lead to auto submission.
          </li>
          <li>Be in a quiet, distraction-free environment.</li>
          <li>Use of calculators, phones, or external help is prohibited.</li>
        </InstructionSection>

        <InstructionSection title="🧪 JEE MAIN / ADVANCED Exam Pattern">
          <h5 className="fw-semibold mt-3">🔹 JEE Mains</h5>
          <ul className="text-start mx-auto d-inline-block text-muted">
            <li>Duration: 3 Hours</li>
            <li>Subjects: Physics, Chemistry, Mathematics</li>
            <li>Total Questions: 90 (30 per subject), attempt any 75</li>
            <li>Marking: +4 correct, -1 incorrect, 0 unattempted</li>
          </ul>

          <h5 className="fw-semibold mt-4">🔹 JEE Advanced</h5>
          <ul className="text-start mx-auto d-inline-block text-muted">
            <li>Two papers: 3 hours each (Paper 1 & 2 compulsory)</li>
            <li>Question Types: MCQ, Numerical, Comprehension</li>
            <li>Marking scheme varies; read paper-specific instructions</li>
          </ul>
        </InstructionSection>

        <InstructionSection title="🧬 NEET Exam Pattern">
          <li>Duration: 3 Hours 20 Minutes</li>
          <li>Subjects: Physics, Chemistry, Biology (Botany + Zoology)</li>
          <li>Total Questions: 200 (attempt 180)</li>
          <li>Section A (35 Qs), Section B (15 Qs, attempt 10)</li>
          <li>Marking: +4 correct, -1 incorrect, 0 unattempted</li>
        </InstructionSection>

        <InstructionSection title="✅ Instructions During the Test">
          <li>Navigate between questions using the sidebar or buttons.</li>
          <li>Use "Mark for Review" to revisit questions later.</li>
          <li>Test will auto-submit when the timer ends.</li>
          <li>Manual submission ends the test and cannot be undone.</li>
        </InstructionSection>

        <InstructionSection title="⚠️ Malpractice Warning" variant="danger">
          <li>Do not switch tabs or open developer tools.</li>
          <li>Frequent tab switching may auto-submit your test.</li>
          <li>Strictly no cheating — be honest to your preparation.</li>
        </InstructionSection>

        <InstructionSection title="📊 After the Test">
          <li>Instant or delayed test report will be provided.</li>
          <li>Review performance, analyze mistakes, and improve.</li>
          <li>Reach out to mentors/support for doubts or help.</li>
        </InstructionSection>

        <InstructionSection title="🎯 Best Practices">
          <li>Keep rough paper and water handy.</li>
          <li>Manage your time — don’t get stuck on one question.</li>
          <li>Stay calm and confident — you’ve got this!</li>
        </InstructionSection>

        <div className="mt-5">
          <button
            className="btn btn-primary btn-lg px-4 py-2 shadow"
            onClick={() => {
              setShowInstruction(false);
            }}
          >
            🚀 Start Test
          </button>
        </div>
      </article>
    </div>
  );
};

interface InstructionSectionProps {
  title: string;
  children: React.ReactNode;
  variant?: "primary" | "danger";
}

const InstructionSection: React.FC<InstructionSectionProps> = ({
  title,
  children,
  variant = "primary",
}) => {
  const textColor = variant === "danger" ? "text-danger" : "text-dark";
  return (
    <section className="mb-4 w-100">
      <h4 className={`fw-semibold mb-3 ${textColor}`}>{title}</h4>
      <ul className="list-unstyled mx-auto d-inline-block text-start text-muted">
        {children}
      </ul>
    </section>
  );
};

export default ExamInstructions;
