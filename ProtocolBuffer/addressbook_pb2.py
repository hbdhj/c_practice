# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: addressbook.proto

from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import descriptor_pb2
# @@protoc_insertion_point(imports)




DESCRIPTOR = _descriptor.FileDescriptor(
  name='addressbook.proto',
  package='lm',
  serialized_pb='\n\x11\x61\x64\x64ressbook.proto\x12\x02lm\"2\n\nhelloworld\x12\n\n\x02id\x18\x01 \x02(\x05\x12\x0b\n\x03str\x18\x02 \x02(\t\x12\x0b\n\x03opt\x18\x03 \x01(\x05')




_HELLOWORLD = _descriptor.Descriptor(
  name='helloworld',
  full_name='lm.helloworld',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='lm.helloworld.id', index=0,
      number=1, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='str', full_name='lm.helloworld.str', index=1,
      number=2, type=9, cpp_type=9, label=2,
      has_default_value=False, default_value=unicode("", "utf-8"),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='opt', full_name='lm.helloworld.opt', index=2,
      number=3, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  extension_ranges=[],
  serialized_start=25,
  serialized_end=75,
)

DESCRIPTOR.message_types_by_name['helloworld'] = _HELLOWORLD

class helloworld(_message.Message):
  __metaclass__ = _reflection.GeneratedProtocolMessageType
  DESCRIPTOR = _HELLOWORLD

  # @@protoc_insertion_point(class_scope:lm.helloworld)


# @@protoc_insertion_point(module_scope)
