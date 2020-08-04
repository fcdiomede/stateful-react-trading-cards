function AddNewCard() {
  // track state of input
  const [name, setName] = React.useState('');
  const [skill, setSkill] = React.useState('');

  //whenever the user makes a change, update the corresponding
  const handleNameChange = (evt) => {setName(evt.currentTarget.value)};
  const handleSkillChange = (evt) => {setSkill(evt.currentTarget.value)};

  //when the user clicks add new card button
  //create a card object and pass it to the server as a JSON object
  const handleClick = () => {
    const newCard = {
      name: name,
      skill: skill
    };
    //post request to back-end
    fetch('/add-card', {method: 'POST', 
                        body: JSON.stringify(newCard), 
                        headers: {'Accept': 'application/json',
                                  'Content-Type': 'application/json'}}
      )
  }

  //HTML for card form
  return (
      <div>
        <h2>Add New Trading Card</h2>

        Name <input type="text" id="nameField" onChange={handleNameChange}></input>
        Skill <input type="text" id="skillField" onChange={handleSkillChange}></input>
        <button id="addCard" onClick={handleClick}>Add</button>
      </div>
    );
}


function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} />
      <p>Skill: {props.skill} </p>
    </div>
  );
}

function TradingCardContainer() {

 const [cards, updateCards] = React.useState([]);

 React.useEffect(() => {
   fetch('/cards.json')
   .then((res) => res.json())
   // the above json'ed response === data for below
   .then((data) => updateCards(data))
 }, []);

 const tradingCards = [];

 for (const currentCard of cards) {
   tradingCards.push(
     <TradingCard
       key={currentCard.name}
       name={currentCard.name}
       skill={currentCard.skill}
       imgUrl={currentCard.imgUrl}
     />
   );
 }

 return (
   <div>{tradingCards}</div>
 );
}


function App() {
 return (
   <div>
     <AddNewCard />

     <TradingCardContainer />

   </div>
   );
}

ReactDOM.render(
 <App />,
 document.getElementById('container')
);