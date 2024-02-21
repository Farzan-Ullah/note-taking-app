/* eslint-disable react/prop-types */

function Popup({
  title,
  groupName,
  handleGroupNameChange,
  colors,
  selectedColor,
  handleColorSelect,
  handleCreateGroup,
}) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <h2>{title}</h2>
          <div className="group-name-input">
            <label htmlFor="groupName">Group Name</label>
            <input
              type="text"
              autoFocus="autoFocus"
              id="groupName"
              value={groupName}
              placeholder="Enter Group Name"
              onChange={handleGroupNameChange}
            />
          </div>

          <div className="color-options-container">
            <label className="color-options-label">Choose Color</label>
            <div className="color-options">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`color-dot ${
                    color === selectedColor ? "color-selected" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>
          </div>
          <button className="create-button" onClick={handleCreateGroup}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
