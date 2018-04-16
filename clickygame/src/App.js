import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

const Shuffle = require('shuffle-array');



class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    imageClickedId: [],
    score: 0,
    totalScore: 0,
    topScore: 0
  };

  // removeFriend = id => {
  //   // Filter this.state.friends for friends with an id not equal to the id being removed
  //   const friends = this.state.friends.filter(friend => friend.id !== id);
  //   // Set this.state.friends equal to the new friends array
  //   this.setState({ friends });
  // };



  handleImageChange = id => {
    var imageClickedId = this.state.imageClickedId;
    // check to see if it's first time or not
    if (!imageClickedId.includes(id)) {
      imageClickedId.push(id)
      // if all images in json displayed
      if (imageClickedId.length === 12) {
        this.setState({ score: 12, totalScore: 12, imageClickedId: [] });
        return;
      }
      // if it's a winner
      if (this.state.score >= this.state.totalScore) {
        this.state.topScore = this.state.score + 1;
      }
      this.setState({ friends, imageClickedId, score: imageClickedId.length, totalScore: this.state.topScore });
      // random generating image for all images
      for (var i = friends.length - 1; i > 0; i--) {
        var j = Math.floor((Math.random() * (i)) + 0);
        [friends[j], friends[i]] = [friends[i], friends[j]];
      }

    } else {
      //lost game over
      if (this.state.score < this.state.totalScore) {
        this.state.topScore = this.state.totalScore;
      }
      this.setState({ imageClickedId: [], score: 0, totalScore: this.state.topScore });
      return;
    }
  }

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>Friends List</Title>
        {this.state.friends.map(friend => (
          <FriendCard
            removeFriend={this.removeFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
