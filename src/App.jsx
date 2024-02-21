import { useState, useEffect } from "react";
import "./App.css";
import defaultImage from "./images/default_image.png";
import lockIcon from "./images/lock-icon.png";
import Popup from "./Popup";
import TextareaSection from "./TextareaSection";

const colors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [groups, setGroups] = useState(
    () => JSON.parse(localStorage.getItem("groups")) || []
  );
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [textToAdd, setTextToAdd] = useState("");

  const handleTextToAddChange = (event) => setTextToAdd(event.target.value);

  useEffect(() => {
    window.localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const togglePopup = () => setShowPopup(!showPopup);

  const handleGroupNameChange = (event) => setGroupName(event.target.value);

  const handleColorSelect = (color) =>
    setSelectedColor((prevColor) => (prevColor === color ? null : color));

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      alert("Please enter a group name.");
      return;
    }
    if (!selectedColor) {
      alert("Please choose a color for the group.");
      return;
    }
    const newGroup = {
      name: groupName,
      color: selectedColor,
      id: Math.random().toString(),
      textContent: "",
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
    togglePopup();
    setGroupName("");
    setSelectedColor("");
  };

  // eslint-disable-next-line react/prop-types
  const TextDisplay = ({ textContent }) => {
    return (
      <div className="card">
        <div className="card-body">
          <p>{textContent}</p>
        </div>
      </div>
    );
  };

  const handleGroupClick = (groupId) => setSelectedGroup(groupId);

  const noGroupsContent = (
    <div className="default-content">
      <img src={defaultImage} alt="Default" />
      <h2 style={{ fontSize: "45px", marginBottom: "10px" }}>Pocket Notes</h2>
      <p
        style={{
          marginTop: 0,
          marginBottom: 0,
          fontSize: "20px",
          width: "600px",
        }}
      >
        Send and receive messages without keeping your phone online.
        <br /> Use Pocket Notes on up to 4 linked devices and 1 mobile phone
      </p>
      <div className="encrypted">
        <img
          style={{ width: "10px" }}
          src={lockIcon}
          alt="Lock"
          className="lock-icon"
        />
        <span style={{ marginLeft: "5px" }}>end-to-end encrypted</span>
      </div>
    </div>
  );

  const handleAddText = () => {
    const existingText = groups.find(
      (group) => group.id === selectedGroup
    ).textContent;
    const updatedText = `${textToAdd}\n${existingText}`;
    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup
        ? { ...group, textContent: updatedText }
        : group
    );
    setGroups(updatedGroups);
    setTextToAdd("");
  };

  return (
    <div className="container">
      <div className="left-pane">
        <h2
          style={{ fontSize: "30px", textAlign: "center", marginTop: "50px" }}
        >
          Pocket Notes
        </h2>
        <div className="group-icons">
          {groups.map((group) => (
            <div
              key={group.id}
              className={`group-icon ${
                selectedGroup === group.id ? "selected" : ""
              }`}
              onClick={() => handleGroupClick(group.id)}
            >
              <div
                className="group-icon-image"
                style={{ backgroundColor: group.color }}
              >
                {getInitials(group.name)}
              </div>
              <div className="group-name">{group.name}</div>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button className="button" onClick={togglePopup}>
            +
          </button>
        </div>
      </div>
      <div className="right-pane">
        {selectedGroup === null ? (
          <div className="centered">{noGroupsContent}</div>
        ) : (
          <div className="textarea-container">
            <TextDisplay
              textContent={
                groups.find((group) => group.id === selectedGroup).textContent
              }
            />
            <TextareaSection
              textToAdd={textToAdd}
              handleTextToAddChange={handleTextToAddChange}
              handleAddText={handleAddText}
            />
          </div>
        )}
      </div>
      {showPopup && (
        <Popup
          closePopup={togglePopup}
          title="Create New Group"
          groupName={groupName}
          handleGroupNameChange={handleGroupNameChange}
          colors={colors}
          selectedColor={selectedColor}
          handleColorSelect={handleColorSelect}
          handleCreateGroup={handleCreateGroup}
        />
      )}
    </div>
  );
}

function getInitials(name) {
  const words = name.split(" ");
  return words.length === 1
    ? name.charAt(0).toUpperCase()
    : `${words[0].charAt(0).toUpperCase()}${words[words.length - 1]
        .charAt(0)
        .toUpperCase()}`;
}

export default App;
