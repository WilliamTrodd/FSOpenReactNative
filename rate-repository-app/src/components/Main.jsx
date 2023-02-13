//import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Route, Routes, Navigate} from 'react-router-native';
import RepositoryList from "./RepositoryList";
import RepositoryView from "./RepositoryView";
import ReviewForm from "./ReviewForm";
import theme from "../theme";
import AppBar from "./AppBar";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUpForm";
import ReviewList from "./ReviewList";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.secondary
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignInForm/>} exact />
        <Route path='/:id' element={<RepositoryView />} exact />
        <Route path="*" element={<Navigate to="/" replace/>} />
        <Route path="/createReview" element={<ReviewForm />}/>
        <Route path="/signup" element={<SignUpForm />}/>
        <Route path="/myReviews" element={<ReviewList />} />
      </Routes>
    </View>
  );
};

export default Main;