# Music-DB - music database

Simple Discogs clone built with React and Firebase.

## Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Technologies](#technologies)
- [Features](#features)
- [To-do](#to-do)

## Introduction

This project is a simplistic clone of Discogs - database of information about music artists, albums, labels, and genres. I have built it with the aim to dive deep into React and make a "real-world" application with authentication and realtime database provided by Firebase.

## Demo

Live demo https://music-db.vercel.app/

## Technologies

Project is created with:

- React 16.13
- Firebase 7.14
- reach/router 1.3
- node-sass 4.14

## Features

Features for unauthenticated users:

- view recently added albums
- view album page
- search through database

Features for authenticated users only:

- add/remove an album to/from user's collection and wishlist
- switch between grid/row view for user's collection and wishlist
- sort albums by date added to database, artist, album, genre, release year
- upload new album to the database
- view all albums uploaded by the current user
- view user's activity log for the past month

## To-do

- to extend the album page with track list
- to create video selector for adding youtube videos to the album page
