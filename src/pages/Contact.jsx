import { useState } from 'react';

function Contact() {
  const initialValues = {
    username: '',
    email: '',
    message: ''
  };

  const [inputs, setInputs] = useState(initialValues);
  const [success, setSuccess] = useState(false);

  function submithandler(e) {
    e.preventDefault();

    fetch("https://formsubmit.co/ajax/3e9e65d9b10b69a5d090217e6c1b7375", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(inputs)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setInputs(initialValues);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000); // Pēc 5 sek. pazūd ziņojums
      })
      .catch(error => console.log(error));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setInputs(values => ({ ...values, [name]: value }));
  }

  function resetForm() {
    setInputs(initialValues);
    setSuccess(false);
  }

  return (
    <>
      <h1>Contact</h1>
      {success && <p className="text-green-600 text-center">Message sent successfully!</p>}
      <form className="flex flex-col gap-4 w-1/2 m-auto" onSubmit={submithandler}>
        <label className="block">Enter your name:
          <input
            type="text"
            name="username"
            className="form-input ml-3"
            onChange={handleChange}
            value={inputs.username}
            required
          />
        </label>
        <label className="block">Enter your email:
          <input
            type="email"
            name="email"
            className="form-input ml-3"
            onChange={handleChange}
            value={inputs.email}
            required
          />
        </label>
        <label className="block">Message:
          <textarea
            name="message"
            className="form-input ml-3"
            onChange={handleChange}
            value={inputs.message}
            required
          />
        </label>

        <div className="flex gap-2">
          <input
            type="submit"
            value="Send"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          />
          <button
            type="button"
            onClick={resetForm}
            className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
}

export default Contact;
