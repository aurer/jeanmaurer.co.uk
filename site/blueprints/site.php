<?php if(!defined('KIRBY')) exit ?>

title: Site
pages: default
files:
  sortable: true
  max: 1
fields:
  title:
    label: Title
    type:  text
  author:
    label: Author
    type:  text
  email:
    label: Email
    type:  text
  description:
    label: Description
    type:  textarea
  keywords:
    label: Keywords
    type:  tags
  copyright:
    label: Copyright
    type:  textarea
