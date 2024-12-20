// import React from 'react';
// import PropTypes from 'prop-types';

// const Workshop = ({ id, items }) => {
//   if (!items) {
//     return <div>No event details available</div>;
//   }

//   return (
//     <div className="h-[460px] w-[350px] bg-zinc-600 relative">
//       <div
//         className="bg-cover bg-center h-full w-full"
//         style={{
//           backgroundImage: `url("https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_420/c_crop%2Cg_custom%2Fv1721024264%2Fjmf7t7nut5xstjb3k8cr.jpg")`,
//         }}
//       ></div>

//       <div className="bg-white h-[100px] w-full bottom-0 absolute rounded-t-lg p-2 flex flex-col justify-between font-semibold">
//         <div className="w-full text-left">{items.eventName}</div>
//         <div className="flex gap-5">
//           <div className="flex text-[#45474D]">
//           </div>
//           {items.date}
//         </div>
//         <div className="flex justify-between px-2 py-2 font-semibold tracking-tighter rounded-md bg-[#FEF3F7]">
//           <div>₹{items.price}</div>
//           <div className="border-l-2 border-red-900 px-2">
//             <button
//               className="text-sm"
//               aria-label={`Buy ticket for ${items.eventName}`}
//             >
//               BUY NOW
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Workshop.propTypes = {
//   id: PropTypes.string.isRequired,
//   items: PropTypes.shape({
//     eventName: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//   }).isRequired,
// };

// export default Workshop;
