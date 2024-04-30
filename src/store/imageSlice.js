// imageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'images',
  initialState:  {
    images: [],
    disLikedImages:[],
    refreshedNum: 0
  },
  reducers: {
    addImage(state, action) {
        let filteredImages = action.payload.filter(item => !state.disLikedImages.includes(item.id))
        state.images = filteredImages
    },
    addDislikedImage(state, action){
        state.disLikedImages.push(...state.disLikedImages, action.payload)
    },
  },
});

export const { addImage, addDislikedImage } = imageSlice.actions;
export default imageSlice.reducer;
