import { useState } from 'react';
import Modal from './Modal';
const TaskMoveModal = ({ onSub, close }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSub = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please fill all required fields');
      return;
    }
    onSub();
    close();
  };

  return (
    <Modal open={true}>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-[450px] p-4 bg-white rounded-lg relative">
          {/* close */}
          <button
            aria-label="close"
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
            onClick={close}
          >
            &times;
          </button>
          <div className="text-center">
            <h3 className="text-xl">Submition Form</h3>
          </div>

          <div className="">
            <form action="" onSubmit={handleSub} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="block">
                  Name:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="py-2 px-4 rounded-md border border-gray-3"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="block">
                  Email:
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-2 px-4 rounded-md border border-gray-3"
                />
              </div>

              {error ? <div className="py-2 px-3 text-red-500 bg-red-50 rounded-lg font-bold">{error}</div> : null}

              <div className="flex items-center gap-4 text-white">
                <button type="button" className="py-2 px-5 bg-red-500 rounded-md" onClick={close}>
                  Cancel
                </button>
                <button type="button" className="py-2 px-5 bg-green-500 rounded-md" onClick={handleSub}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskMoveModal;
