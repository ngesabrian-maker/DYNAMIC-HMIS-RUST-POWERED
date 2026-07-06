import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _status = 'Loading...';

  @override
  void initState() {
    super.initState();
    _fetchHealth();
  }

  Future<void> _fetchHealth() async {
    try {
      final response = await http.get(Uri.parse('http://127.0.0.1:8080/api/health'));
      final decoded = jsonDecode(response.body) as Map<String, dynamic>;
      setState(() {
        _status = decoded['service']?.toString() ?? 'Unknown';
      });
    } catch (error) {
      setState(() {
        _status = 'Unable to reach API';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'HMIS Mobile',
      home: Scaffold(
        appBar: AppBar(title: const Text('HMIS Mobile')),
        body: Center(child: Text('API service: $_status')),
      ),
    );
  }
}
