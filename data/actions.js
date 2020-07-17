import firebase from './firebase'

export const deleteCategory = (id) => {
    const batch = firebase.firestore().batch()
    let categoryRef = firebase.firestore().collection('categories').doc(category.id).delete()
    const childrenCount = categories.filter(c => c.id !== category.id && c.parentId === category.parentId)
    if (childrenCount === 0) {
      categoryRef = firebase.firestore().collection('categories').doc(category.parentId)
      batch.update(categoryRef, {
        isLeaf: true
      })
    }
    batch.commit()
  }
  