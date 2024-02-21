/* eslint-disable react/prop-types */
function TextareaSection({ textToAdd, handleTextToAddChange, handleAddText }) {
  return (
    <div className="textarea-with-button">
      <div className="relative-container">
        <textarea
          className="text-area"
          value={textToAdd}
          onChange={handleTextToAddChange}
          placeholder="Enter text here..."
        />
        <button className="add-button" onClick={handleAddText}>
          Add Text
        </button>
      </div>
    </div>
  );
}

export default TextareaSection;
