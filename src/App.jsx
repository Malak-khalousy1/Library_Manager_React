import { add, get, update, remove } from "./services/api";

const booksUrl = "http://localhost:3000/books";

function App() {

  const testGet = async () => {
    const result = await get(booksUrl);
    console.log("GET:", result);
  };

  const testAdd = async () => {
    const newBook = {
      title: "The Trial",
      authorId: "5",
      category: "Novel",
      available: true
    };

    const result = await add(booksUrl, newBook);
    console.log("POST:", result);
  };

  const testUpdate = async () => {
    const updatedBook = {
      title: "1984 - Updated",
      authorId: "1",
      category: "Dystopian",
      available: false
    };

    const result = await update(booksUrl, updatedBook, "1");
    console.log("PUT:", result);
  };

  const testDelete = async () => {
    const result = await remove(booksUrl, "6");
    console.log("DELETE:", result);
  };

  return (
    <div>
      <h1>API Test</h1>

      <button onClick={testGet}>GET Books</button>
      <button onClick={testAdd}>ADD Book</button>
      <button onClick={testUpdate}>UPDATE Book</button>
      <button onClick={testDelete}>DELETE Book</button>
    </div>
  );
}

export default App;