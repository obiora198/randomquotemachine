function App() {
    const [quotes, setQuotes] = React.useState([]);
    const [randQuotes, setRandQuotes] = React.useState('');
    const [randColors, setRandColors] = React.useState('#16a085');

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://type.fit/api/quotes");
            const data = await response.json();

            setQuotes(data);
            let randIndex = Math.floor(Math.random() * data.length);
            setRandQuotes(data[randIndex]);
        }
        fetchData();
    }, [])

    const handleClick = () => {

        const  colors = [
            '#16a085',
            '#27ae60',
            '#2c3e50',
            '#f39c12',
            '#e74c3c',
            '#9b59b6',
            '#FB6964',
            '#342224',
            '#472E32',
            '#BDBB99',
            '#77B1A9',
            '#73A857'
          ];

        let randIndex = Math.floor(Math.random() * quotes.length);
        let randColorIndex = Math.floor(Math.random() * colors.length);
        setRandQuotes(quotes[randIndex]);
        setRandColors(colors[randColorIndex]);
    }

    return (
        <div className="w-full h-screen flex flex-col gap-3 justify-center items-center" style={{backgroundColor: randColors, color: randColors}}> 
            <div className="w-[600px] bg-white flex flex-col gap-3 p-10 rounded" id="quote-box">
                {randQuotes ? (
                    <>
                    <p className="text-3xl font-bold text-center" id="text">
                        <i className="fa-solid fa-quote-left"></i> 
                        {randQuotes.text}
                    </p>
                    <p className="text-xl text-end" id="author">
                        - {randQuotes.author || 'No author'}
                    </p>
                    </>
                ) : (
                    <h2>...</h2>
                )}
                <div className="flex justify-between text-white">
                    <a className="px-4 py-2 rounded" 
                    style={{backgroundColor: randColors}}
                    id="tweet-quote"
                    href={
                        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                        encodeURIComponent(
                            '"' + randQuotes.text + '" ' + randQuotes.author
                        )
                    }
                    target="_blank"><i className="fa-brands fa-twitter"></i></a>
                    <button 
                    onClick={handleClick}
                    className="px-4 py-2 rounded " 
                    style={{backgroundColor: randColors}}
                    id="new-quote">New Quote</button>
                </div>
            </div>
            <p className="text-white">by Emmanuel Obiora</p>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('app'))