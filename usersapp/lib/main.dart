import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

void main() {
  runApp(
    MaterialApp(home: HomePage()),
  );
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  Map data;
  List userList;
  get getUsers async {
    http.Response response =
        await http.get('http://192.168.1.72:5000/api/users');
    data = json.decode(response.body);
    setState(() {
      userList = data['users'];
    });
  }

  get addUsers async {
    await http.get('http://192.168.1.72:5000/api/users/create');
  }

  @override
  void initState() {
    super.initState();
    getUsers;
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('User List'),
      ),
      body: ListUsers(userList: userList),
      floatingActionButton: FloatingActionButton(
        onPressed: () => getUsers(),
        child: Icon(Icons.refresh),
      ),
      bottomNavigationBar: FloatingActionButton(
          child: Icon(Icons.add), onPressed: () => addUsers()),
    );
  }
}

class ListUsers extends StatelessWidget {
  const ListUsers({
    Key key,
    @required this.userList,
  }) : super(key: key);

  final List userList;
  get delusers async {
    await http.get('http://192.168.1.72:5000/api/users/delete');
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: userList == null ? 0 : userList.length,
      scrollDirection: Axis.vertical,
      shrinkWrap: true,
      itemBuilder: (BuildContext context, int index) {
        return Card(
          child: Padding(
            padding: const EdgeInsets.all(12.0),
            child: Row(
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Text(
                    "${index + 1}",
                    style:
                        TextStyle(fontSize: 20.0, fontWeight: FontWeight.w500),
                  ),
                ),
                CircleAvatar(
                  backgroundImage: NetworkImage(userList[index]["avatar"]),
                ),
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: Text(
                    "${userList[index]["firstName"]} ${userList[index]["lastName"]}",
                    style: TextStyle(
                      fontSize: 20.0,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.delete),
                  onPressed: () => delusers(),
                )
              ],
            ),
          ),
        );
      },
    );
  }
}
