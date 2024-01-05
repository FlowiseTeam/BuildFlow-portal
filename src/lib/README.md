## Overview

The lib folder is a central repository for all the custom libraries, utilities, where we want to use the _Adapter Pattern_. _Adapter pattern_ is a design pattern that allows us to easily change the underlying implementation of an interface without affecting its consumers. For example if we import tailwindMerge and export it as tw, we can easily replace tailwindMerge with other library without changing the tw occurences.
