package com.lorenzoog.projectkob.server

class EntityNotFoundException : RuntimeException("Could not found the requested entity")

class AuthorizationException : RuntimeException()
class AuthenticationException : RuntimeException()
